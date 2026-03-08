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
        {/* <Navigation>
            <ActionBar items={actions}/>
        </Navigation> */}
        {children}
    </div>
  );
};