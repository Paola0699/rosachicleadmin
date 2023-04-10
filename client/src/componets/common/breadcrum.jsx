function Breadcrum(props) {
  const { parent, children } = props;
  return (
    <nav className="breadcrumb is-small" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#">{parent}</a>
        </li>
        <li className="is-active">
          <a href="#">{children}</a>
        </li>
      </ul>
    </nav>
  );
}
export default Breadcrum;
