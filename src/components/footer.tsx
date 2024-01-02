import { EmailIcon, XIcon } from "react-share";

function Footer(): React.JSX.Element {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <hr></hr>
        <p>2024&copy;kumastry</p>

        <div className="columns  is-centered">
          <div className="column  is-narrow  ">
            <a href="https://x.com/kumastry1" target="_black">
              <XIcon size={48} round />
            </a>
          </div>

          <div className="column  is-narrow">
            <a href="mailto:kumastry2212@gmail.com">
              <EmailIcon size={48} round />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
