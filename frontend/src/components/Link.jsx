import React from "react";
import { Menu } from "semantic-ui-react";

const Link = ({ className, href, children, isActive }) => {
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
    <Menu.Item
      as="a"
      onClick={onClick}
      className={`${className} header-link`}
      href={href}
      active={isActive}
    >
      {children}
    </Menu.Item>
  );
};

export default Link;
