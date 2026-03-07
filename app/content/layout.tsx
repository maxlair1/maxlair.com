import Navigation from "@components/Navigation";
import ActionBar from "@components/ActionBar";

export default function LocalLayout({ children }: { children: React.ReactNode }) {
    const actions = [
        {
            body: "SHARE",
        },
    ];
    
  return (
    <div>
        {/* <Navigation logoHref="/" logoTarget="_self" logo={<Logo type="icon" fill="var(--theme-focused-foreground)"/>}> */}
        <Navigation>
            <ActionBar items={actions}/>
        </Navigation>
        {children}
    </div>
  );
};