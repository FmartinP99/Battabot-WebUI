import Header from "./_components/Header";
import MainView from "./_components/MainView";

export const metadata = {
  title: "Battabot Web UI",
};

export default function Page() {
  return (
    <div className="relative z-10 text-center">
      <MainView />
    </div>
  );
}
