import React from "react";

export default function PrivacyPolicyPage() {
    return (
        <div className="w-full h-full p-6 lg:p-10 bg-white text-gray-800 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-accent">Privacy Policy</h1>
                <p className="mb-6 text-gray-500 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
                
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">1. Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, phone number, shipping address, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, as well as to process transactions, send you related information, and respond to your comments and questions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">3. Information Sharing</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We do not share your personal information with third parties except as described in this privacy policy, such as with vendors and service providers who need access to such information to carry out work on our behalf.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">4. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">5. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at support@i-techsolutions.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
