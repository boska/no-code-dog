import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex flex-col min-w-64">
        <h1 className="text-2xl font-medium text-white">重設密碼</h1>
        <p className="text-sm text-gray-400">
          想起密碼了？{" "}
          <Link className="text-red-500 font-medium hover:text-red-400" href="/sign-in">
            返回登入
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email" className="text-gray-300">電子信箱</Label>
          <Input name="email" placeholder="請輸入您的電子信箱" required />
          <SubmitButton formAction={forgotPasswordAction} pendingText="處理中...">
            發送重設密碼連結
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
