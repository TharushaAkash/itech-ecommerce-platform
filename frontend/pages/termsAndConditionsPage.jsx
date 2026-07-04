import React from "react";

export default function TermsAndConditionsPage() {
    return (
        <div className="w-full h-full p-6 lg:p-10 bg-white text-gray-800 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-accent">Terms and Conditions</h1>
                <p className="mb-6 text-gray-500 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
                
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">2. Use License</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Permission is granted to temporarily download one copy of the materials (information or software) on I-Tech Solutions' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">3. User Accounts</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you create an account on the website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">4. Disclaimer</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The materials on I-Tech Solutions' website are provided on an 'as is' basis. I-Tech Solutions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">5. Governing Law</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Any claim relating to I-Tech Solutions' website shall be governed by the laws of the website owner's jurisdiction without regard to its conflict of law provisions.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
