export async function getData(url: string) {
  try {
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error();
    }
    const data =await req.json();
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    //stop loading....
  }
}
