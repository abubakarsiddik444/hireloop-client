import { Card } from "@heroui/react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card
      variant="default"
      className="h-[137px] border border-white/10 bg-[#1a1a1a] shadow-none"
    >
      <Card.Content className="flex h-full flex-col p-4">
        {/* Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#353537] text-gray-200">
          {Icon && <Icon size={18} />}
        </div>

        {/* Stats */}
        <div className="mt-auto">
          <Card.Description className="text-[11px] text-gray-400">
            {title}
          </Card.Description>

          <Card.Title className="mt-1 text-xl font-medium tracking-tight text-white">
            {value}
          </Card.Title>
        </div>
      </Card.Content>
    </Card>
  );
};

export default StatCard;