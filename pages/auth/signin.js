import React, { useEffect } from "react";
import {
  getProviders,
  signIn as SingInToProvider,
  useSession,
} from "next-auth/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const SignIn = ({ providers }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      dispatch({
        type: "SET_SESSION",
        payload: {
          sessionName: session?.user.name,
          sessionImage: session?.user.image,
          sessionEmail: session?.user.email,
        },
      });
      router.push("/");
    } else {
      dispatch({
        type: "SET_SESSION",
        payload: {},
      });
    }
  }, [session]);

  return (
    <>
      <div
        className=" bg-gray_500 flex items-center justify-center flex-col 
      h-screen text-center py-2 px-14 "
      >
        {Object.values(providers).map((provider) => (
          <div className="" key={provider.name}>
            <button
              className="border p-2 rounded-xl bg-green_400  "
              onClick={() =>
                SingInToProvider(provider.id, { callbackUrl: "/" })
              }
            >
              Login With {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
export default SignIn;
