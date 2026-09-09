import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpinnerCircular } from "spinners-react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { useAuth } from "@/components/utils/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminList() {
  const { user } = useAuth();
  const isSuper = user?.role === "super_admin";
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const limit = 10;

  const fetch = async (p = 1, search = q, sort = sortBy) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/destinations/search", {
        params: {
          search: search || undefined,
          page: p,
          limit,
          sort_by: sort || "newest",
        },
      });
      const rows = res.data.data || [];
      const pagination = res.data.pagination;
      setData(rows);
      if (pagination) {
        setTotalPages(pagination.totalPages || 1);
        setTotal(pagination.total || 0);
      } else {
        setTotalPages(rows.length === limit ? p + 1 : p);
        setTotal(0);
      }
      setPage(p);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(1, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    fetch(1, q, sortBy);
  };

  const onSortChange = (value) => {
    const v = value === "default" ? "" : value;
    setSortBy(v);
    fetch(1, q, v);
  };

  const onDelete = async (uuid) => {
    try {
      await axiosInstance.delete(`/destinations/${uuid}`);
      setData((prev) => prev.filter((d) => d.uuid !== uuid));
    } catch (err) {
      alert(err.response?.data?.message || "Gagal hapus");
    }
  };

  return (
    <>
      <Helmet>
        <title>Kelola Destinasi — EduSolo</title>
      </Helmet>
      <section className="max-container mx-auto w-11/12 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-neutral-black text-2xl font-bold sm:text-3xl">
              Kelola Destinasi
            </h1>
            <p className="text-neutral-dark-grey mt-1 text-sm">
              {isSuper
                ? "Daftar destinasi — tambah, edit atau hapus."
                : "Mode lihat saja — akun admin hanya bisa melihat data."}
            </p>
            {!isSuper && (
              <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                View only — hubungi super admin untuk CRUD
              </span>
            )}
          </div>
          {isSuper && (
            <Link to="/admin/destinations/new">
              <Button className="h-12 rounded-xl">
                <Plus className="mr-2 h-4 w-4" /> Tambah Baru
              </Button>
            </Link>
          )}
        </div>

        <form
          onSubmit={onSearch}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="text-neutral-grey absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama..."
              className="h-12 bg-white pl-10"
            />
          </div>
          <Select value={sortBy || "newest"} onValueChange={onSortChange}>
            <SelectTrigger className="h-12 w-full bg-white sm:w-[200px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="name-asc">Nama A-Z</SelectItem>
              <SelectItem value="name-desc">Nama Z-A</SelectItem>
              <SelectItem value="lowest-price">Harga Terendah</SelectItem>
              <SelectItem value="highest-price">Harga Tertinggi</SelectItem>
              <SelectItem value="highest-rating">Rating Tertinggi</SelectItem>
              <SelectItem value="review-count">Ulasan Terbanyak</SelectItem>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" variant="outline" className="h-12 rounded-xl">
            Cari
          </Button>
        </form>

        <Card className="rounded-xl bg-white">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-bg text-neutral-dark-grey">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="px-4 py-3 font-semibold">Region</th>
                    <th className="px-4 py-3 font-semibold">Harga</th>
                    <th className="px-4 py-3 font-semibold">Rating</th>
                    <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <tr key={d.uuid} className="border-t">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              d.thumbnail_url ||
                              "/images/default-placeholder.png"
                            }
                            alt={d.name}
                            className="h-10 w-10 rounded-lg object-cover"
                            loading="lazy"
                          />
                          <div>
                            <div className="line-clamp-1 font-semibold">
                              {d.name}
                            </div>
                            <div className="text-neutral-dark-grey line-clamp-1 text-xs">
                              {d.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="custom" className="rounded-full">
                          {d.region_name || "-"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {d.ticket_price_min && Number(d.ticket_price_min) > 0
                          ? `Rp${Number(d.ticket_price_min).toLocaleString("id-ID")}`
                          : "Gratis"}
                      </td>
                      <td className="px-4 py-3">
                        {d.average_rating && Number(d.average_rating) > 0
                          ? d.average_rating
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          {isSuper ? (
                            <>
                              <Link to={`/admin/destinations/${d.uuid}/edit`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 rounded-lg"
                                >
                                  <Pencil className="mr-1 h-3 w-3" /> Edit
                                </Button>
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="h-8 rounded-lg"
                                  >
                                    <Trash2 className="mr-1 h-3 w-3" /> Hapus
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Hapus destinasi?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      {" "}
                                      {d.name} akan dihapus permanen beserta
                                      gambarnya.{" "}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => onDelete(d.uuid)}
                                      className="bg-destructive"
                                    >
                                      Hapus
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          ) : (
                            <span className="text-neutral-grey text-xs">
                              View only
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && !loading && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-neutral-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {loading && (
              <div className="flex justify-center py-6">
                <SpinnerCircular
                  size={28}
                  thickness={100}
                  color="#0163D2"
                  secondaryColor="#e5e7eb"
                />
              </div>
            )}
            {!loading && (
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => fetch(page - 1, q, sortBy)}
                    disabled={page <= 1 || loading}
                  >
                    ← Sebelumnya
                  </Button>
                  <span className="text-neutral-dark-grey text-sm font-medium">
                    Halaman {page} dari {totalPages}{" "}
                    {total ? `• ${total} total` : ""}
                  </span>
                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => fetch(page + 1, q, sortBy)}
                    disabled={page >= totalPages || loading}
                  >
                    Selanjutnya →
                  </Button>
                </div>
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    <Button
                      size="sm"
                      variant={page === 1 ? "default" : "outline"}
                      className="h-8 min-w-8 rounded-lg px-3"
                      onClick={() => fetch(1, q, sortBy)}
                      disabled={loading}
                    >
                      1
                    </Button>
                    {page > 3 && (
                      <span className="px-1 text-sm text-neutral-500">…</span>
                    )}
                    {page > 2 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 rounded-lg p-0"
                        onClick={() => fetch(page - 1, q, sortBy)}
                        disabled={loading}
                      >
                        {page - 1}
                      </Button>
                    )}
                    {page !== 1 && page !== totalPages && (
                      <Button
                        size="sm"
                        variant="default"
                        className="h-8 w-8 rounded-lg p-0 font-bold"
                        disabled
                      >
                        {page}
                      </Button>
                    )}
                    {page < totalPages - 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 rounded-lg p-0"
                        onClick={() => fetch(page + 1, q, sortBy)}
                        disabled={loading}
                      >
                        {page + 1}
                      </Button>
                    )}
                    {page < totalPages - 2 && (
                      <span className="px-1 text-sm text-neutral-500">…</span>
                    )}
                    <Button
                      size="sm"
                      variant={page === totalPages ? "default" : "outline"}
                      className="h-8 min-w-8 rounded-lg px-3"
                      onClick={() => fetch(totalPages, q, sortBy)}
                      disabled={loading}
                    >
                      {totalPages}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
