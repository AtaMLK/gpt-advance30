import AuthGuard from "../component/authGuard";

export default function Dashboard() {
  return (
    <AuthGuard>
      <div>Dashboard content only for logged-in users</div>
    </AuthGuard>
  );
}
