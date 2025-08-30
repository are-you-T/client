import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Loader, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import { Notifications } from "@mantine/notifications";

import { ErrorFallback } from "@/components/ErrorFallback";
import { Layout } from "@/components/Layout";
import { ModalStackManager } from "@/components/Modal";
import routePaths from "@/router";
import { globalTheme } from "@/styles/global";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={globalTheme} withGlobalClasses withStaticClasses>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ModalStackManager>
              <Notifications />
              <Layout>
                <Routes>
                  {routePaths.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                </Routes>
              </Layout>
            </ModalStackManager>
          </ErrorBoundary>
        </Suspense>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
