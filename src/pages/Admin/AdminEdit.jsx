import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";
import useFetchRegions from "@/api/useFetchRegions.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { ArrowLeft, Trash2, Star } from "lucide-react";

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

export default function AdminEdit() {
  const { uuid } = useParams();
  const { regions } = useFetchRegions();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [images, setImages] = useState([]);
  const [existing, setExisting] = useState([]);
  const [preview, setPreview] = useState([]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      region_id: "",
      latitude: "",
      longitude: "",
      description: "",
      ticket_price_min: "",
      ticket_price_max: "",
      website_url: "",
    },
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/destinations/by-uuid/${uuid}`);
        const d = res.data.data;
        form.reset({
          name: d.name || "",
          address: d.address || "",
          region_id: d.region_id ? String(d.region_id) : "",
          latitude: d.latitude ? String(d.latitude) : "",
          longitude: d.longitude ? String(d.longitude) : "",
          description: d.description || "",
          ticket_price_min: d.ticket_price_min
            ? String(d.ticket_price_min)
            : "",
          ticket_price_max: d.ticket_price_max
            ? String(d.ticket_price_max)
            : "",
          website_url: d.website_url || "",
        });
        const imgRes = await axiosInstance.get(`/destinations/${uuid}/images`);
        setExisting(imgRes.data.data || []);
      } catch (e) {
        setError(e.response?.data?.message || "Gagal load data");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [uuid, form]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    preview.forEach((url) => URL.revokeObjectURL(url));
    setImages(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
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
      await axiosInstance.put(`/destinations/${uuid}`, payload);
      if (images.length > 0) {
        const fd = new FormData();
        const newFiles = images.slice(0, 5);
        newFiles.forEach((f) => fd.append("images", f));
        // First new image auto primary among new batch (khusus baru)
        newFiles.forEach((_, idx) =>
          fd.append("is_primary", idx === 0 ? "true" : "false"),
        );
        await axiosInstance.post(`/destinations/${uuid}/upload-images`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // Immediately refresh left panel so new images appear
        const imgRes = await axiosInstance.get(`/destinations/${uuid}/images`);
        setExisting(imgRes.data.data || []);
        // Clear new preview
        preview.forEach((url) => URL.revokeObjectURL(url));
        setImages([]);
        setPreview([]);
      }
      setSuccess("Berhasil diperbarui");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          err.message ||
          "Gagal simpan",
      );
    } finally {
      setLoading(false);
    }
  };

  const onDeleteImage = async (id) => {
    try {
      await axiosInstance.delete(`/destinations/${uuid}/images/${id}`);
      setExisting((prev) => prev.filter((im) => im.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Gagal hapus gambar");
    }
  };

  const onPrimary = async (id) => {
    try {
      await axiosInstance.patch(`/destinations/${uuid}/images/${id}/primary`);
      const res = await axiosInstance.get(`/destinations/${uuid}/images`);
      setExisting(res.data.data || []);
    } catch (e) {
      alert(e.response?.data?.message || "Gagal set primary");
    }
  };

  if (fetching)
    return (
      <div className="flex justify-center py-20">
        <SpinnerCircular size={40} color="#0163D2" secondaryColor="#e5e7eb" />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Edit Destinasi — EduSolo</title>
      </Helmet>
      <section className="max-container mx-auto w-11/12 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/admin/destinations">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ArrowLeft className="mr-1 h-4 w-4" /> Kembali
            </Button>
          </Link>
          <h1 className="text-neutral-black text-2xl font-bold">
            Edit Destinasi
          </h1>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertTitle className="text-state-success">{success}</AlertTitle>
            <AlertDescription>
              <Link
                to={`/admin/destinations`}
                className="text-pr-blue-800 underline"
              >
                Kembali ke daftar
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
            <Card className="rounded-xl bg-white">
              <CardHeader>
                <CardTitle>Edit Data</CardTitle>
                <CardDescription>Ubah field lalu simpan.</CardDescription>
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
                            <Input className="h-12 bg-white" {...field} />
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
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input className="h-12 bg-white" {...field} />
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
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input className="h-12 bg-white" {...field} />
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
                              <Input className="h-12 bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="ticket_price_min"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Harga Min</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className="h-12 bg-white"
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
                                type="number"
                                className="h-12 bg-white"
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
                            <Textarea className="min-h-24" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium">
                        Tambah Gambar (maks 5){" "}
                        {images.length > 0 && (
                          <span className="text-pr-blue-800">
                            — {images.length}/5
                          </span>
                        )}
                      </label>
                      <label className="border-neutral-light-grey bg-neutral-light-bg hover:border-pr-blue-300 hover:bg-pr-blue-50/50 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition">
                        <span className="text-neutral-dark-grey text-sm font-medium">
                          Klik atau seret gambar baru
                        </span>
                        <span className="text-neutral-grey mt-1 text-xs">
                          JPG/PNG/WebP, 5MB per file
                        </span>
                        <Input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFiles}
                          className="hidden"
                        />
                      </label>
                      {preview.length > 0 && (
                        <div className="grid grid-cols-5 gap-2">
                          {preview.map((src, i) => (
                            <div key={i} className="group relative">
                              <img
                                src={src}
                                alt="preview"
                                className="h-20 w-full rounded-lg border object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  URL.revokeObjectURL(src);
                                  setImages((p) =>
                                    p.filter((_, idx) => idx !== i),
                                  );
                                  setPreview((p) =>
                                    p.filter((_, idx) => idx !== i),
                                  );
                                }}
                                className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100"
                              >
                                ✕
                              </button>
                              <div className="absolute right-1 bottom-1 left-1 line-clamp-1 rounded bg-black/60 px-1 py-0.5 text-[10px] text-white">
                                {images[i]?.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-neutral-grey text-xs">
                        File baru akan ditambahkan; gambar pertama baru tidak
                        otomatis primary (atur di panel kanan).
                      </p>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 rounded-xl"
                    >
                      {loading ? (
                        <SpinnerCircular size={20} color="#fff" />
                      ) : (
                        "Simpan Perubahan"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="rounded-xl bg-white">
              <CardHeader>
                <CardTitle>Gambar Saat Ini</CardTitle>
                <CardDescription>Kelola primary & hapus.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {existing.length === 0 && (
                  <p className="text-sm text-neutral-500">
                    Belum ada gambar — unggah di kiri.
                  </p>
                )}
                {existing.map((im) => (
                  <div
                    key={im.id}
                    className={`flex items-center gap-3 rounded-xl border p-2 transition ${im.is_primary ? "border-pr-blue-300 bg-pr-blue-50" : "hover:bg-neutral-light-bg bg-white"}`}
                  >
                    <div className="relative">
                      <img
                        src={im.image_url}
                        alt="img"
                        className="h-16 w-16 rounded-lg border object-cover"
                      />
                      {im.is_primary ? (
                        <span className="bg-state-success absolute -top-1 -right-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
                          ★ Primary
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-1 text-xs font-medium">
                        {im.image_url.split("/").pop()}
                      </div>
                      <div className="text-neutral-grey text-[11px]">
                        {im.is_primary
                          ? "Ditampilkan sebagai thumbnail utama"
                          : "Klik untuk jadikan utama"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!im.is_primary && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 rounded-full text-xs"
                          onClick={() => onPrimary(im.id)}
                        >
                          <Star className="mr-1 h-3 w-3" /> Primary
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-state-error hover:bg-state-error/10 h-7 w-7"
                        onClick={() => onDeleteImage(im.id)}
                        title="Hapus gambar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
