"use client";
export default function FilterError({ error }) {
  console.log("erorr", error);
  return (
    <div id="error">
      <h2>An Error occured!</h2>
      <p>{error.message}</p>
    </div>
  );
}
