import { antdTheme, muiTheme } from "@/config/theme";
import store from "@/redux";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
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

const Providers = ({ children }: IProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <Provider store={store}>
          <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
        </Provider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default Providers;
