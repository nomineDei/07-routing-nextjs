"use client";

type Props = {
  error: Error;
};

function ErrorMessage({ error }: Props) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default ErrorMessage;
