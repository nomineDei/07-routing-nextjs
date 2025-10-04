"use client";

type Props = {
  error: Error;
};

function ErrorMessage({ error }: Props) {
  return <p>Could not fetch note details. {error.message}</p>;
}

export default ErrorMessage;
