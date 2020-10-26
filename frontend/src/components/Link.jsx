import React from "react";
import { Menu } from "semantic-ui-react";

const Link = ({ className, href, children }) => {
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    e.preventDefault();
    window.history.pushState({}, "", href);

    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <Menu.Item as="a" onClick={onClick} className={className} href={href}>
      {children}
    </Menu.Item>
  );
};

export default Link;
