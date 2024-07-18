interface ICollapsedWrapperProps {
  children: React.ReactNode;
  collapsed: boolean;
}

function CollapsedWrapper({ children, collapsed }: ICollapsedWrapperProps) {
  return (
    <div
      className="overflow-hidden transition-effect"
      style={{
        width: collapsed ? 0 : "100%",
      }}
    >
      {children}
    </div>
  );
}

export default CollapsedWrapper;
