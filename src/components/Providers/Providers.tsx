import store from "@/redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

interface IProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      networkMode: "offlineFirst",
      refetchOnWindowFocus: true,
      retry: 0,
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#28123E",
    },
  },
  typography: {
    fontFamily: "Space Grotesk",
  },
});

const Providers = ({ children }: IProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
