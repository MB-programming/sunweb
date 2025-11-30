"use client";
import React, { useState, useEffect } from "react";
import { usePricingPlans, useSettingsMutations } from "@/app/lib/hooks/useSettings";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";
import { Icon } from "@iconify/react";
import PageHeader from "@/app/Components/UI/PageHeader";

const Page = () => {
  const { pricingPlans, loading: fetchLoading, refetch } = usePricingPlans();
  const { savePricingPlans, loading: saveLoading } = useSettingsMutations();

  const [activePlan, setActivePlan] = useState("basic");
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    if (pricingPlans) {
      setPlans(pricingPlans);
    }
  }, [pricingPlans]);

  const handlePlanChange = (field, value) => {
    setPlans(prev => ({
      ...prev,
      [activePlan]: {
        ...prev[activePlan],
        [field]: value
      }
    }));
  };

  const handleIncludesChange = (index, value) => {
    const newIncludes = [...plans[activePlan].includes];
    newIncludes[index] = value;

    setPlans(prev => ({
      ...prev,
      [activePlan]: {
        ...prev[activePlan],
        includes: newIncludes
      }
    }));
  };

  const addIncludeItem = () => {
    setPlans(prev => ({
      ...prev,
      [activePlan]: {
        ...prev[activePlan],
        includes: [...prev[activePlan].includes, ""]
      }
    }));
  };

  const removeIncludeItem = (index) => {
    const newIncludes = plans[activePlan].includes.filter((_, i) => i !== index);

    setPlans(prev => ({
      ...prev,
      [activePlan]: {
        ...prev[activePlan],
        includes: newIncludes
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!plans.basic.title || !plans.standard.title || !plans.premium.title) {
      return toast.error("All plan titles are required!");
    }

    try {
      await savePricingPlans(plans);
      toast.success("Pricing plans updated successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update pricing plans");
    }
  };

  if (fetchLoading || !plans) {
    return <LoadingPage />;
  }

  const currentPlan = plans[activePlan];

  return (
    <div className="mt-3 animate-fadeIn">
      {saveLoading && <LoadingPage />}
      <Notifcation />

      {/* Header */}
      <PageHeader
        title="Pricing Plans Management"
        description="Edit pricing plans displayed on the pricing page"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Pricing Plans" }
        ]}
      />

      {/* Plan Selector */}
      <div className="mt-6 flex gap-3 flex-wrap">
        {Object.keys(plans).map((key) => (
          <button
            key={key}
            onClick={() => setActivePlan(key)}
            className={`px-6 py-3 rounded font-medium transition ${
              activePlan === key
                ? "bg-main text-black"
                : "bg-background2 text-body hover:bg-white/10"
            }`}
          >
            {plans[key].title}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="bg-background2 rounded px-6 py-6">
          <h4 className="text-white text-lg font-semibold mb-4">
            Editing: {currentPlan.title}
          </h4>

          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="text-base text-white font-semibold">
                Plan Title *
              </label>
              <input
                type="text"
                id="title"
                value={currentPlan.title}
                onChange={(e) => handlePlanChange("title", e.target.value)}
                placeholder="e.g., Basic Plan (Starter)"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
            </div>

            <div>
              <label htmlFor="desc" className="text-base text-white font-semibold">
                Description
              </label>
              <textarea
                id="desc"
                value={currentPlan.desc}
                onChange={(e) => handlePlanChange("desc", e.target.value)}
                placeholder="Brief description of this plan"
                rows="2"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="priceFrom" className="text-base text-white font-semibold">
                  Price From ($)
                </label>
                <input
                  type="number"
                  id="priceFrom"
                  value={currentPlan.priceFrom}
                  onChange={(e) => handlePlanChange("priceFrom", parseInt(e.target.value))}
                  placeholder="e.g., 300"
                  className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
                />
              </div>

              <div>
                <label htmlFor="priceTo" className="text-base text-white font-semibold">
                  Price To ($)
                </label>
                <input
                  type="number"
                  id="priceTo"
                  value={currentPlan.priceTo}
                  onChange={(e) => handlePlanChange("priceTo", parseInt(e.target.value))}
                  placeholder="e.g., 500"
                  className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-base text-white font-semibold">
                  Includes
                </label>
                <button
                  type="button"
                  onClick={addIncludeItem}
                  className="text-main hover:text-white transition"
                >
                  <Icon icon="mdi:plus-circle" width="24" height="24" />
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {currentPlan.includes.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleIncludesChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="p-3 flex-1 border focus:border-main border-stroke rounded outline-none text-white bg-white/5"
                    />
                    <button
                      type="button"
                      onClick={() => removeIncludeItem(index)}
                      className="p-3 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                    >
                      <Icon icon="mdi:delete" width="20" height="20" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={saveLoading}
              className="bg-main p-3 px-8 text-[1rem] font-medium rounded hover-main duration-300 text-black disabled:opacity-50"
            >
              {saveLoading ? "Saving..." : "Save All Plans"}
            </button>
            <button
              type="button"
              onClick={() => refetch()}
              className="bg-white/5 p-3 px-8 text-[1rem] font-medium rounded border border-stroke text-white hover:border-main duration-300"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 bg-background2 rounded px-6 py-6">
        <h4 className="text-white text-lg font-semibold mb-4">Preview</h4>
        <div className="bg-background rounded p-6">
          <h3 className="text-white text-xl font-medium">
            {currentPlan.title}
          </h3>
          <p className="text-body text-sm mt-2">{currentPlan.desc}</p>
          <p className="text-white text-3xl font-bold mt-4">
            $ {currentPlan.priceFrom} – {currentPlan.priceTo}
          </p>
          <p className="mt-4 text-sm text-body">Includes:</p>
          <div className="mt-3 space-y-2">
            {currentPlan.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="flex justify-center items-center rounded-full bg-gradient-to-r from-main to-purple-500"
                  style={{ width: "20px", height: "20px" }}
                >
                  <Icon icon="material-symbols:done" width="16" height="16" style={{ color: "#000" }} />
                </div>
                <span className="text-body text-sm">{item || "Feature item"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
