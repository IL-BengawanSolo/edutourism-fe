import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm({ className, ...props }) {
  return (
    <form className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Lengkapi Profil Anda</h1>
        <p className="text-muted-foreground text-sm text-left">
          Selamat, kamu sudah selesai mendaftarkan email di sistem EduSolo, sekarang lengkapi identitas kamu untuk menyelesaikan pendaftaran.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            type="text"
            placeholder="Masukan nama kamu"
            className="h-12 bg-white"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            className="h-12 bg-white"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="birthdate">Tanggal Lahir</Label>
          <Input
            id="birthdate"
            type="date"
            className="h-12 bg-white"
            required
          />
        </div>
        <Button type="submit" className="h-11 w-full font-semibold">
          Simpan Profil
        </Button>
      </div>
    </form>
  );
}