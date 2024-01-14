"use server";
async function handleEditApplicationDetails(data: FormData) {
  console.log(data.get("name"));
}

export { handleEditApplicationDetails };
