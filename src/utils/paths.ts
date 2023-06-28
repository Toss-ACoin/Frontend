import { useNavigate, useParams } from "react-router-dom";

export const paths = {
  landingPage: "/",
  collections: "/collections",
  collection: (collectionId?: number): string => `/collection/${collectionId}`,
  collectionTemplate: "/collection/:collectionId",
  about: "/about",
  profile: "/profile",
  signIn: "/signIn",
  signUp: "/signUp",
  create: "/create",
  notFound: "/notFound",
  payment: "/payment",
  usersList: "/users",
  collectionsList: "/collectionsList",
};

export const useCollectionId = (): number => {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  if (typeof collectionId === "undefined" || collectionId === "") {
    navigate(paths.notFound);
    return 0;
  }

  return +collectionId;
};
