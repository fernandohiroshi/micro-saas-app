export default function Footer() {
  return (
    <footer className="p-6 text-center text-neutral-700 text-sm md:text-base">
      <p>
        Todos direitos reservados © {new Date().getFullYear()} By{" "}
        <a
          href="https://konbinicode.com/pt"
          target="_blank"
          className="hover:font-semibold ease-in-out duration-200 underline"
        >
          Konbinicode.com
        </a>
      </p>
    </footer>
  );
}
