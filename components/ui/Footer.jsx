export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} ZoomStore • This is a Zoom It Front-End
        role assignment • Developed by Md Sohag Miya
      </div>
    </footer>
  );
}
