export default function ContentForm({ isUpload }) {
  return <>{isUpload ? <h1>Hello Upload</h1> : <h1>Hello Edit</h1>}</>;
}
