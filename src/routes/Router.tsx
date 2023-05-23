import { paths } from "@utils/paths";
import { lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./LandingPage/LandingPage";

const ContentWrapper = lazy(() => import("./ContentWrapper/ContentWrapper"));
const SignIn = lazy(() => import("./SignIn/SignIn"));
const SignUpPage = lazy(() => import("./SignUpPage/SignUpPage"));
const Protected = lazy(() => import("./Protected/Protected"));
const Collections = lazy(() => import("./Collections/Collections"));
const CollectionPage = lazy(() => import("./CollectionPage/CollectionPage"));
const AboutUs = lazy(() => import("./AboutUs/AboutUs"));

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={null}>
              <SignIn />
            </Suspense>
          }
          path={paths.signIn}
        />
        <Route
          element={
            <Suspense fallback={null}>
              <SignUpPage />
            </Suspense>
          }
          path={paths.signUp}
        />
        <Route element={<ContentWrapper />}>
          <Route
            element={
              <Suspense fallback={null}>
                <LandingPage />
              </Suspense>
            }
            path={paths.landingPage}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <CollectionPage />
              </Suspense>
            }
            path={"/collection"}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Collections />
              </Suspense>
            }
            path={"/collections"}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <AboutUs />
              </Suspense>
            }
            path={"/about"}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Protected />
              </Suspense>
            }
          >
            {/* ----Temp--- */}
            <Route
              element={
                <Suspense fallback={null}>
                  <LandingPage />
                </Suspense>
              }
              path={paths.profile}
            />
            {/* ---------- */}
            {/* afterLogIn for example profile settings create collectons etc*/}

            <Route
              element={
                <Suspense fallback={null}>
                  <CreateCollection />
                </Suspense>
              }
              path={paths.create}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
