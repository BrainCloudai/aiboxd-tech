import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";

export default function HomePage() {
  const { user } = useUser();
  const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY");

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });
    const session = await res.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Aiboxd.tech</h1>
      {!user ? (
        <SignInButton mode="modal">
          <button>Sign In for Free Trial</button>
        </SignInButton>
      ) : (
        <>
          <p>Hello, {user.fullName}</p>
          <SignOutButton><button>Sign Out</button></SignOutButton>
          <br /><br />
          <button onClick={handleCheckout}>Buy Full Access</button>
        </>
      )}
    </div>
  );
}
