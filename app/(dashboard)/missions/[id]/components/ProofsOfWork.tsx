import TiptapRender from "@/components/TiptapRender";
import { useListPoW, useVerifyPoW } from "@/supabase/api/mission/services";
import { Button, message } from "antd";
import { LuCheck } from "react-icons/lu";

interface TProofsOfWorkProps {
  missionID: string;
}

function ProofsOfWork({ missionID }: TProofsOfWorkProps) {
  const { data, isLoading, refetch } = useListPoW(missionID);
  const { mutate, isPending } = useVerifyPoW();
  if (isLoading || data === undefined || data.length === 0) {
    return null;
  }

  return (
    <div className="mt-5">
      <h2 className="text-primary-color font-bold text-xl xl:text-2xl pr-3">Proofs of work</h2>
      <div className="flex gap-x-3 w-full pb-2 overflow-x-scroll mt-2">
        {data.map((proof) => {
          const identity = proof.user.email ? proof.user.email : proof.user.username;
          const isVerified = proof.is_verified;
          return (
            <div key={proof.id} className="bg-white rounded-lg shadow-md p-3 shrink-0 w-[320px] h-fit">
              <h4 className="text-base xl:text-lg font-bold line-clamp-1">{identity}</h4>
              {proof.proof !== undefined && proof.proof !== "" && <TiptapRender content={proof.proof} />}
              {proof.image !== undefined && proof.image !== "" && (
                <div className="w-full aspect-video rounded-md overflow-hidden">
                  <img className="size-full object-cover" src={proof.image_url} alt="proof" />
                </div>
              )}
              <div className="flex w-full justify-end mt-2">
                <Button
                  className="px-2 py-[2px] h-7"
                  style={{
                    backgroundColor: isVerified ? "green" : "transparent",
                  }}
                  type={isVerified ? "primary" : "default"}
                  onClick={() => {
                    if (isVerified) return;
                    mutate(proof.id as number, {
                      onSuccess: (resp) => {
                        if (resp) {
                          message.success("verified successfully!");
                          refetch();
                        }
                      },
                    });
                  }}
                  loading={isPending}
                  icon={<LuCheck />}
                >
                  {isVerified ? "Verified" : "Verify"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProofsOfWork;
