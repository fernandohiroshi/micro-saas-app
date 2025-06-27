export default function Footer() {
  return (
    <footer className="p-6 text-center text-sm text-neutral-700 md:text-base">
      <p>
        Todos direitos reservados © {new Date().getFullYear()} By{" "}
        <a
          href="https://konbinicode.com/pt"
          target="_blank"
          className="underline duration-200 ease-in-out hover:font-semibold"
        >
          Konbinicode.com
        </a>
      </p>
    </footer>
  )
}
