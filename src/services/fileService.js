export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  const res = await fetch('/api/upload', {
    method: "POST",
    body: formData,
  });
  return await res.json();
};
