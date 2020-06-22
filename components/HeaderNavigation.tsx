import * as React from "react";
import Link from "next/link";
import { getCookie } from "tiny-cookie";
import classnames from "classnames";
import { ExpandedIcon } from "outline-icons";
import { spacing, colors } from "theme";
import useOnClickOutside from "lib/hooks/useOnClickOutside";

function MenuItem({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: (event) => void;
  className?: string;
  target?: string;
}) {
  return (
    <>
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
      <style jsx>
        {`
          a {
            display: flex;
            align-items: center;
            padding: ${spacing.small} ${spacing.medium};
            color: rgba(0, 0, 0, 0.75);
            text-decoration: none;
            white-space: nowrap;
            min-height: 40px;
            font-weight: 500;
            position: relative;
            user-select: none;
          }

          a.open,
          a.open:hover {
            background: none;
          }

          a.menu-with-icon {
            padding-right: 8px;
            position: relative;
            z-index: 2;
          }

          li ul li a {
            display: flex;
            margin: 0;
            overflow: hidden;
          }

          a.launch,
          a.highlighted,
          a:hover {
            background: ${colors.grey};
            border-radius: 4px;
          }

          a.launch {
            width: 160px;
          }
        `}
      </style>
    </>
  );
}

function Teams({ sessions }) {
  return (
    <>
      {Object.keys(sessions).map((teamId) => {
        const session = sessions[teamId];
        return (
          <li key={teamId}>
            <MenuItem href={session.url} className="session">
              <img className="teamLogo" src={session.logoUrl} />{" "}
              <span>{session.name}</span>
            </MenuItem>
          </li>
        );
      })}
      <style jsx>
        {`
          a.session {
            font-weight: 500;
          }

          .teamLogo {
            display: inline-block;
            margin-right: ${spacing.small};
            border: 1px solid ${colors.grey};
            border-radius: 4px;
            width: 32px;
            height: 32px;
          }
        `}
      </style>
    </>
  );
}

export default function HeaderNavigation() {
  const ref = React.useRef();
  const [openNav, setOpenNav] = React.useState(null);

  useOnClickOutside(ref, () => setOpenNav(null));

  let sessions = {};

  const setActiveNav = (name) => (event) => {
    event.preventDefault();
    setOpenNav(name);
  };

  if (typeof document !== "undefined") {
    sessions = JSON.parse(getCookie("sessions") || "{}");
  }

  const isSignedIn = Object.keys(sessions).length;

  return (
    <nav role="navigation" ref={ref}>
      <ul>
        <li className={openNav === "product" ? "open" : "hidden-on-mobile"}>
          <MenuItem
            className={classnames(
              "menu-with-icon",
              openNav === "product" && "open"
            )}
            aria-haspopup="true"
            onClick={setActiveNav("product")}
          >
            Product <ExpandedIcon color="currentColor" />
          </MenuItem>
          <ul>
            <li>
              <Link href="/integrations">
                <MenuItem>Integrations</MenuItem>
              </Link>
            </li>
            <li>
              <Link href="/developers">
                <MenuItem>Developers</MenuItem>
              </Link>
            </li>
            <li>
              <Link href="/changelog">
                <MenuItem>Changelog</MenuItem>
              </Link>
            </li>
          </ul>
        </li>
        <li className="hidden-on-mobile">
          <Link href="/pricing">
            <MenuItem>Pricing</MenuItem>
          </Link>
        </li>
        <li className={openNav === "community" ? "open" : "hidden-on-mobile"}>
          <MenuItem
            className={classnames(
              "menu-with-icon",
              openNav === "community" && "open"
            )}
            aria-haspopup="true"
            onClick={setActiveNav("community")}
          >
            Community <ExpandedIcon color="currentColor" />
          </MenuItem>
          <ul>
            <li>
              <MenuItem href="mailto:hello@getoutline.com">Contact Us</MenuItem>
            </li>
            <li>
              <MenuItem href="https://github.com/outline" target="_blank">
                GitHub
              </MenuItem>
            </li>
            <li>
              <MenuItem
                href="https://github.com/outline/outline/discussions"
                target="_blank"
              >
                Discuss
              </MenuItem>
            </li>
            <li>
              <MenuItem href="https://twitter.com/outlinewiki" target="_blank">
                Twitter
              </MenuItem>
            </li>
          </ul>
        </li>
        <li
          className={openNav === "sessions" ? "open" : "hidden-on-mobile"}
          key={isSignedIn}
        >
          {isSignedIn ? (
            <>
              <MenuItem
                href="#login"
                className={classnames(
                  "launch",
                  "menu-with-icon",
                  openNav === "sessions" && "open"
                )}
                aria-haspopup="true"
                onClick={setActiveNav("sessions")}
              >
                Launch Outline <ExpandedIcon color="currentColor" />
              </MenuItem>
              <ul className="sessions">
                <Teams sessions={sessions} />
              </ul>
            </>
          ) : (
            <MenuItem className="highlighted" href="//app.getoutline.com">
              Log in or Sign up
            </MenuItem>
          )}
        </li>
        <li className={openNav === "mobile" ? "open" : "hidden-on-desktop"}>
          <MenuItem
            href="#login"
            className={classnames(
              "highlighted",
              "menu-with-icon",
              openNav === "mobile" && "open"
            )}
            aria-haspopup="true"
            onClick={setActiveNav("mobile")}
          >
            Menu <ExpandedIcon color="currentColor" />
          </MenuItem>
          <ul className="mobile">
            <h3>Launch</h3>
            {isSignedIn ? (
              <Teams sessions={sessions} />
            ) : (
              <li>
                <MenuItem href="//app.getoutline.com">
                  Log in | Sign up
                </MenuItem>
              </li>
            )}

            <h3>Product</h3>
            <li>
              <Link href="/integrations">
                <MenuItem>Integrations</MenuItem>
              </Link>
            </li>
            <li>
              <Link href="/developers">
                <MenuItem>Developers</MenuItem>
              </Link>
            </li>
            <li>
              <Link href="/changelog">
                <MenuItem>Changelog</MenuItem>
              </Link>
            </li>
            <li>
              <Link href="/pricing">
                <MenuItem>Pricing</MenuItem>
              </Link>
            </li>

            <h3>Community</h3>
            <li>
              <MenuItem href="mailto:hello@getoutline.com">Contact Us</MenuItem>
            </li>
            <li>
              <MenuItem href="https://github.com/outline" target="_blank">
                GitHub
              </MenuItem>
            </li>
            <li>
              <MenuItem
                href="https://github.com/outline/outline/discussions"
                target="_blank"
              >
                Discuss
              </MenuItem>
            </li>
            <li>
              <MenuItem href="https://twitter.com/outlinewiki" target="_blank">
                Twitter
              </MenuItem>
            </li>
          </ul>
        </li>
      </ul>
      <style jsx>
        {`
          nav {
            display: flex;
            justify-content: flex-end;
          }

          ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          li {
            display: block;
            transition-duration: 0.5s;
            position: relative;
            margin: 0 0 0 ${spacing.medium};
          }

          li:hover {
            cursor: pointer;
          }

          ul li ul {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            transition: all 0.5s ease;
            margin-top: 0;
            margin-left: ${spacing.medium};
            left: 0;
            display: none;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 4px;
            min-width: 136px;
            z-index: 1;
          }

          ul li ul.sessions {
            min-width: 160px;
            max-width: 260px;
          }

          ul li ul.mobile {
            width: 55vw;
            min-width: 0;
            left: auto;
            right: 0;
          }

          h3 {
            margin-left: ${spacing.medium};
            margin-bottom: 0.5em;
          }

          ul li ul a:last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }

          ul li.open > ul,
          ul li:focus-within > ul,
          ul li ul:hover,
          ul li ul:focus {
            visibility: visible;
            opacity: 1;
            display: block;

            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08);
            padding-top: 42px;
            margin-top: -42px;
            margin-left: 0;
          }

          ul li ul li {
            clear: both;
            width: 100%;
            margin: 0;
          }

          li.hidden-on-desktop {
            display: none;
          }

          @media (max-width: 48em) {
            li.hidden-on-desktop {
              display: block;
            }
            li.hidden-on-mobile {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}
