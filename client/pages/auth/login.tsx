import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ApolloError } from "@apollo/client";

import { useLoginMutation } from "../../generated/graphql";
import AnimatedInput from "../../components/ui/AnimatedInput";
import ArrowButton from "../../components/ui/ArrowButton";

interface FormInput {
  credentials: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<ApolloError | null>(null);

  const [loginMutation] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        credentials: yup.string().required(),
        password: yup.string().required(),
      })
    ),
  });

  const login = async ({ credentials, password }: FormInput) => {
    setError(null);

    try {
      const {
        data: { login: data },
      } = await loginMutation({
        variables: {
          credentials,
          password,
        },
      });
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(login)}>
        <h1>Login</h1>
        <AnimatedInput
          text={"Username or Email Address"}
          name={"credentials"}
          register={register}
          error={errors.credentials}
        />
        <AnimatedInput
          text={"Password"}
          inputType={"password"}
          margin={30}
          name={"password"}
          register={register}
          error={errors.password}
        />
        <p className="err-msg">{error?.message}</p>
        <div className="submit-btn">
          <ArrowButton text={"Login"} buttonColor={"#46a2c2"} buttonHoverColor={"#2f83a5"} type={"submit"} />
        </div>
      </form>

      <style jsx>{`
        form {
          width: 60%;
          margin: 130px auto;
        }

        form > h1 {
          margin-bottom: 30px;
          font-size: 1.6rem;
        }

        .submit-btn {
          float: right;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
