import { AuthProvider } from "@/auth.provider";
import "@/styles/globals.css";
import { ThemeProvider } from "@/theme.provider";
import { ToastProvider } from "@radix-ui/react-toast";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider>
          <Toaster />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
