import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import useFetchRegions from "@/api/useFetchRegions.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { SpinnerCircular } from "spinners-react";

const schema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(255),
  address: z.string().trim().max(1000).optional().or(z.literal("")),
  region_id: z.string().optional().or(z.literal("")),
  latitude: z.string().optional().or(z.literal("")),
  longitude: z.string().optional().or(z.literal("")),
  description: z.string().trim().max(5000).optional().or(z.literal("")),
  ticket_price_min: z.string().optional().or(z.literal("")),
  ticket_price_max: z.string().optional().or(z.literal("")),
  website_url: z
    .string()
    .trim()
    .url("URL tidak valid")
    .max(2048)
    .optional()
    .or(z.literal("")),
});

export default function AdminDestinations() {
  const { regions } = useFetchRegions();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      region_id: "",
      latitude: "", // safe: null → BE nullable, isi "-7.5604" untuk center Solo jika ingin default
      longitude: "",
      description: "",
      ticket_price_min: "", // safe: "" → null → Gratis/0 di BE
      ticket_price_max: "",
      website_url: "",
    },
  });

  // Revoke preview URLs on unmount / change to avoid memory leak
  React.useEffect(() => {
    return () => preview.forEach((url) => URL.revokeObjectURL(url));
  }, [preview]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    // revoke old previews
    preview.forEach((url) => URL.revokeObjectURL(url));
    setImages(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
    // reset file input if too many
    if (e.target.files && e.target.files.length > 5) {
      e.target.value = "";
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        name: values.name,
        address: values.address || null,
        region_id: values.region_id ? Number(values.region_id) : null,
        latitude: values.latitude ? Number(values.latitude) : null,
        longitude: values.longitude ? Number(values.longitude) : null,
        description: values.description || null,
        ticket_price_min: values.ticket_price_min
          ? Number(values.ticket_price_min)
          : null,
        ticket_price_max: values.ticket_price_max
          ? Number(values.ticket_price_max)
          : null,
        website_url: values.website_url || null,
      };
      const res = await axiosInstance.post("/destinations", payload);
      const { uuid, slug } = res.data.data;
      if (images.length > 0) {
        const fd = new FormData();
        const newFiles = images.slice(0, 5);
        newFiles.forEach((file) => fd.append("images", file));
        newFiles.forEach((_, idx) =>
          fd.append("is_primary", idx === 0 ? "true" : "false"),
        );
        await axiosInstance.post(`/destinations/${uuid}/upload-images`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setSuccess({ slug, uuid });
      form.reset();
      setImages([]);
      setPreview([]);
      // Redirect to list (default sorting terbaru will show new item on top)
      setTimeout(() => navigate("/admin/destinations"), 800);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Gagal menyimpan";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kelola Destinasi — EduSolo</title>
        <meta
          name="description"
          content="Admin: tambah destinasi wisata edukasi Solo Raya dengan 5 gambar."
        />
      </Helmet>
      <section className="max-container mx-auto w-11/12 py-8">
        <div className="mb-6">
          <h1 className="text-neutral-black text-2xl font-bold sm:text-3xl">
            Kelola Destinasi
          </h1>
          <p className="text-neutral-dark-grey mt-2 text-sm">
            Tambah destinasi baru — lengkapi data dan unggah hingga 5 gambar
            dalam satu langkah.
          </p>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertTitle className="text-state-success">
              Berhasil disimpan
            </AlertTitle>
            <AlertDescription>
              <span className="mr-2">Slug: {success.slug}</span>
              <Link
                to={`/destinations/${success.slug}`}
                className="text-pr-blue-800 font-semibold underline"
              >
                Lihat detail
              </Link>
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Gagal</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="rounded-xl border bg-white py-6 shadow-sm">
              <CardHeader>
                <CardTitle className="text-neutral-black">
                  Tambah Destinasi
                </CardTitle>
                <CardDescription>Isi data utama destinasi.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama *</FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 bg-white"
                              placeholder="Kampung Batik Laweyan"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="region_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 bg-white">
                                  <SelectValue placeholder="Pilih region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {regions?.map((r) => (
                                  <SelectItem key={r.id} value={String(r.id)}>
                                    {r.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="website_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website URL</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 bg-white"
                                placeholder="https://example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Jl. ... Solo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 bg-white"
                                placeholder="-7.56988"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 bg-white"
                                placeholder="110.797"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="ticket_price_min"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Harga Min</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 bg-white"
                                type="number"
                                placeholder="25000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ticket_price_max"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Harga Max</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 bg-white"
                                type="number"
                                placeholder="50000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deskripsi</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Deskripsi destinasi..."
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={loading}
                      className="mt-2 h-12 w-full rounded-xl font-semibold"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <SpinnerCircular
                            size={20}
                            thickness={120}
                            color="#fff"
                            secondaryColor="#ffffff40"
                          />{" "}
                          Menyimpan...
                        </span>
                      ) : (
                        "Simpan Destinasi"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="rounded-xl border bg-white py-6 shadow-sm">
              <CardHeader>
                <CardTitle className="text-neutral-black">Gambar</CardTitle>
                <CardDescription>
                  Pilih hingga 5 gambar. Pertama jadi primary.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Label className="text-sm font-medium">
                  Upload Gambar{" "}
                  {images.length > 0 && (
                    <span className="text-pr-blue-800">
                      — {images.length}/5
                    </span>
                  )}
                </Label>
                <label className="border-neutral-light-grey bg-neutral-light-bg hover:border-pr-blue-300 hover:bg-pr-blue-50/50 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition">
                  <span className="text-neutral-dark-grey text-sm font-medium">
                    Klik atau seret ke sini
                  </span>
                  <span className="text-neutral-grey mt-1 text-xs">
                    JPG, PNG, WebP — 5MB per file
                  </span>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>
                {images.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-dark-grey text-xs">
                      {images.length} file terpilih
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => {
                        preview.forEach((u) => URL.revokeObjectURL(u));
                        setImages([]);
                        setPreview([]);
                      }}
                    >
                      Hapus semua
                    </Button>
                  </div>
                )}
                {preview.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {preview.map((src, i) => (
                      <div key={i} className="group relative">
                        <img
                          src={src}
                          alt={`preview ${i}`}
                          className="h-24 w-full rounded-xl border object-cover"
                        />
                        <span className="text-neutral-dark-grey absolute top-1 left-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold">
                          {i === 0 ? "Primary" : `#${i + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            URL.revokeObjectURL(src);
                            setImages((prev) =>
                              prev.filter((_, idx) => idx !== i),
                            );
                            setPreview((prev) =>
                              prev.filter((_, idx) => idx !== i),
                            );
                          }}
                          className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          ✕
                        </button>
                        <div className="absolute right-1 bottom-1 left-1 line-clamp-1 rounded bg-black/60 px-1 py-0.5 text-[10px] text-white">
                          {images[i]?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-neutral-500">
                    Belum ada gambar — pilih di atas.
                  </p>
                )}
                <p className="text-neutral-dark-grey text-xs">
                  Gambar pertama otomatis{" "}
                  <span className="font-semibold">primary</span>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
