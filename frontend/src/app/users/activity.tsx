import { Button } from "@heroui/react";

import { useToggleUserActivity } from "@/hooks/users";
import { IUser } from "@/types/users";

interface UserActivityProps {
  user: IUser;
  complete: () => void;
}

export default function UserActivity({ user, complete }: UserActivityProps) {

  const { mutate: apiActivity } = useToggleUserActivity();

  const handleActivity = () => {
    apiActivity(user.id, {
      onSuccess: () => {
        complete();
      }, onError: (error) => {
        console.error("Failed to change user activity", error);
      }
    });
  };

  return (
    <Button color={user.active ? "danger" : "success"} size="sm" onPress={handleActivity}>
      {user.active ? "InActive" : "Active"}
    </Button>
  );
}

