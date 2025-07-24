import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

function FilterDialogFooter({
  isDirtySaveButton,
  isDirtyResetButton,
  onReset,
  onSave,
}) {
  return (
    <>
      {(isDirtyResetButton || isDirtySaveButton) && (
        <DialogFooter
          className="absolute bottom-0 left-0 z-10 flex w-full gap-2 border-t border-neutral-200 bg-white px-6 py-4"
          style={{ boxShadow: "0 -2px 8px 0 rgba(0,0,0,0.03)" }}
        >
          <div className="flex w-full">
            {isDirtyResetButton && (
              <div className="flex flex-1">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onReset}
                  size="custom"
                  className="h-10 rounded-full text-lg font-bold"
                >
                  Reset
                </Button>
              </div>
            )}
            {isDirtySaveButton && (
              <div
                className={isDirtyResetButton ? "" : "flex flex-1 justify-end"}
              >
                <Button
                  type="submit"
                  variant="default"
                  size="custom"
                  className="h-10"
                  onClick={onSave}
                >
                  Simpan
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      )}
    </>
  );
}

export default FilterDialogFooter;
