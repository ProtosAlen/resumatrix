
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

//import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { FormattedMessage } from 'react-intl';

import messages from '../locales/en/pages/index.json'; // Assuming your JSON is in the same directory

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>
            <h1 className={title()}><FormattedMessage id="make" defaultMessage={messages.make} />&nbsp;</h1>
            <h1 className={title({ color: "violet" })}><FormattedMessage id="beautiful" defaultMessage={messages.beautiful} /></h1>
          </h1>

          <br />

          <h1 className={title()}>
            <FormattedMessage id="website_description" defaultMessage={messages.website_description} />
          </h1>
          <h4 className={subtitle({ class: "mt-4" })}>
            <FormattedMessage id="react_ui_library" defaultMessage={messages.react_ui_library} />
          </h4>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/docs"
          >
            <FormattedMessage id="documentation" defaultMessage={messages.documentation} />
          </Link>
          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="/docs"
          >
            <GithubIcon size={20} />
            <FormattedMessage id="github" defaultMessage={messages.github} />
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              <FormattedMessage id="get_started" defaultMessage={messages.get_started} />&nbsp;
              <Link href="/docs">
                <Code color="primary">pages/Builder</Code>
              </Link>


            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
