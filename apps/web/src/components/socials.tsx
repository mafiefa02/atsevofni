import { GithubFillIcon } from "./icons/github";
import { GlobeIcon } from "./icons/globe";
import { LinkedinIcon } from "./icons/linkedin";
import { buttonVariants } from "./ui/button/button-variants";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const SOCIAL_MEDIAS = [
  {
    label: "GitHub",
    icon: <GithubFillIcon />,
    href: "https://github.com/mafiefa02",
  },
  {
    label: "LinkedIn",
    icon: <LinkedinIcon />,
    href: "https://linkedin.com/in/mafiefa",
  },
  {
    label: "Personal website",
    icon: <GlobeIcon />,
    href: "https://afiefabd.com",
  },
];

export const Socials = () => {
  return SOCIAL_MEDIAS.map((media) => (
    <Tooltip key={media.href}>
      <TooltipTrigger asChild>
        <a
          className={buttonVariants({
            variant: "ghost",
            size: "icon-sm",
          })}
          href={media.href}
          target="_blank"
        >
          {media.icon}
        </a>
      </TooltipTrigger>
      <TooltipContent>{media.label}</TooltipContent>
    </Tooltip>
  ));
};
