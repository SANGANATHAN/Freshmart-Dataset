const CognosEmbed = () => (
  <div className="bg-card rounded-xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
    <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">IBM Cognos Dashboard</h3>
    <div className="rounded-lg border border-border" style={{ overflow: "hidden" }}>
      <iframe
        src="https://us1.ca.analytics.ibm.com/bi/?perspective=dashboard&pathRef=.my_folders%2Fproject%2B5%2Bquestion&closeWindowOnLastView=true&ui_appbar=false&ui_navbar=false&shareMode=embedded&action=view&mode=dashboard&subView=model0000019d618345ba_00000002&nav_filter=true"
        className="w-full border-0"
        style={{ height: "100vh", overflow: "hidden" }}
        title="IBM Cognos Analytics Dashboard"
        allow="encrypted-media"
        allowFullScreen
        scrolling="no"
      />
    </div>
  </div>
);

export default CognosEmbed;
