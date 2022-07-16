class ThemeManager {
  isLight =
    typeof window === "undefined" ||
    window.matchMedia("(prefers-color-scheme: light)").matches;

  toggleTheme(): void {
    this.isLight = !this.isLight;

    let smuiLink = document.head.querySelector<HTMLLinkElement>("#smui");
    let colorLink = document.head.querySelector<HTMLLinkElement>("#color");
    if (!smuiLink) {
      smuiLink = document.createElement("link");
      smuiLink.rel = "stylesheet";
      smuiLink.id = "theme";
    }
    if (!colorLink) {
      colorLink = document.createElement("link");
      colorLink.rel = "stylesheet";
      colorLink.id = "color";
    }

    smuiLink.href = `/smui${this.isLight ? "" : "-dark"}.css`;
    colorLink.href = `/variables${this.isLight ? "" : "-dark"}.css`;
    document.head
      .querySelector<HTMLLinkElement>('link[href$="/smui-dark.css"]')
      ?.insertAdjacentElement("afterend", smuiLink);
    document.head
      .querySelector<HTMLLinkElement>('link[href$="/variables-dark.css"]')
      ?.insertAdjacentElement("afterend", colorLink);
  }
}

export { ThemeManager };
