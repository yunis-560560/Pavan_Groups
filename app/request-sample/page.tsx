"use client";
import SampleRequest from "@/components/SampleRequest";
import Link from "next/link";

export default function RequestSamplePage() {
  return (
    <div className="bg-[#fcf8f1] min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-8">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#747474]">
          <Link href="/" className="hover:text-[#241919] transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-[#514a38] font-semibold uppercase">REQUEST STONE SAMPLE</span>
        </div>
      </div>
      <SampleRequest />
    </div>
  );
}
