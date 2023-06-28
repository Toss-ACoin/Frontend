import { paths } from "@utils/paths";
import { lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminContentWrapper from "./AdminContentWraper/AdminContentWraper";
import { CollectionsList } from "./CollectionsList/CollectionsList";
import CreateCollection from "./CreateCollection/CreateCollection";
import { LandingPage } from "./LandingPage/LandingPage";
import { UserCollections } from "./UserCollections/UserCollections";
import UserPanel from "./UserPanel/UserPanel";
import { UsersList } from "./UsersList/UsersList";

const ContentWrapper = lazy(() => import("./ContentWrapper/ContentWrapper"));
const SignIn = lazy(() => import("./SignIn/SignIn"));
const SignUpPage = lazy(() => import("./SignUpPage/SignUpPage"));
const Protected = lazy(() => import("./Protected/Protected"));
const Collections = lazy(() => import("./Collections/Collections"));
const CollectionPage = lazy(() => import("./CollectionPage/CollectionPage"));
const AboutUs = lazy(() => import("./AboutUs/AboutUs"));
const Payments = lazy(() => import("./Payments/Payments"));

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
            path={paths.collectionTemplate}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Collections />
              </Suspense>
            }
            path={paths.collections}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <AboutUs />
              </Suspense>
            }
            path={paths.about}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Payments />
              </Suspense>
            }
            path={paths.payment}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Protected />
              </Suspense>
            }
          >
            <Route element={<AdminContentWrapper />}>
              <Route element={<UsersList />} path={paths.usersList} />
              <Route
                element={<CollectionsList />}
                path={paths.collectionsList}
              />
            </Route>

            <Route element={<UserPanel />} path={paths.profile} />
            <Route element={<UserCollections />} path={paths.myCollections} />

            <Route element={<CreateCollection />} path={paths.create} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
