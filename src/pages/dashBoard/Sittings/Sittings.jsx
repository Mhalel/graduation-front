import { use, useState } from "react";
import {
  Trash2,
  AlertTriangle,
  Settings,
  Database,
  Bell,
  Shield,
} from "lucide-react";
import { useT } from "@/hooks/LangContext";
import Delete from "@/Apis/Delete";
import { useSnackbar } from "@/hooks/SnackBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { useSocket } from "@/hooks/SensorReadings";

export default function Sittings() {
  const { setWorning, setReadings, setRealTimeReading } = useSocket();
  const { auth } = useAuth();
  const T = useT();
  const { openSnackbar } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState({
    account: false,
    readings: false,
    notifications: false,
  });

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه!"
      )
    ) {
      setIsDeleting((prev) => ({ ...prev, account: true }));
      Delete.DeleteAccount(auth)
        .then(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("account");
          localStorage.removeItem("tokenExpiration");
          console.log("تم حذف الحساب");
          openSnackbar(
            T("تم حذف الحساب بنجاح", "Account deleted successfully"),
            { type: "success" }
          );
          window.location.href = "/";
        })
        .catch((error) => {
          openSnackbar(T("خطأ في حذف الحساب", "Error deleting account"), {
            type: "error",
          });
          console.error("خطأ في حذف الحساب:", error);
        })
        .finally(() => {
          setIsDeleting((prev) => ({ ...prev, account: false }));
        });
    }
  };

  const handleDeleteReadings = () => {
    if (window.confirm("هل أنت متأكد من حذف جميع القراءات؟")) {
      setIsDeleting((prev) => ({ ...prev, readings: true }));
      Delete.DeleteReadings()
        .then(() => {
          localStorage.removeItem("sensor_readings");
          console.log("تم حذف القراءات");
          openSnackbar(
            T("تم حذف القراءات بنجاح", "Readings deleted successfully"),
            { type: "success" }
          );
          setReadings([]);
          setRealTimeReading({
            autoState: false,
            dhFanState: false,
            ccFanState: false,
            acFanState: false,
            pumpState: false,
            ledState: false,
            lux: 0,
            luxGoal: 0,
            eTemp: 0,
            humidity: 0,
            pressure: 0,
            cTemp: 0,
            s1Temp: 0,
            s2Temp: 0,
            s1Moisture: 0,
            s2Moisture: 0,
          });
        })
        .catch((error) => {
          openSnackbar(T("خطأ في حذف القراءات", "Error deleting readings"), {
            type: "error",
          });
          console.error("خطأ في حذف القراءات:", error);
        })
        .finally(() => {
          setIsDeleting((prev) => ({ ...prev, readings: false }));
        });
    }
  };

  const handleDeleteNotifications = async () => {
    if (window.confirm("هل أنت متأكد من حذف جميع الإشعارات؟")) {
      setIsDeleting((prev) => ({ ...prev, notifications: true }));
      try {
        Delete.DeleteAlerts();
        openSnackbar(
          T("تم حذف الإشعارات بنجاح", "Notifications deleted successfully"),
          { type: "success" }
        );
        localStorage.removeItem("wornings");
        setWorning([]);
        console.log("تم حذف الإشعارات");
      } catch (error) {
        console.error("خطأ في حذف الإشعارات:", error);
      } finally {
        setIsDeleting((prev) => ({ ...prev, notifications: false }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {T("الإعدادات", "Settings")}
                </h1>
                <p className="text-muted-foreground">
                  {T("إدارة الحساب والتطبيق", "Manage Account and App")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <div>
                {/* <h2 className="text-xl font-semibold text-foreground">
                  منطقة الخطر
                </h2> */}
                <p className="text-sm text-muted-foreground">
                  {T(" عمليات حذف البيانات", "Data Deletion Operations")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                      <Database className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {T("حذف القراءات", "Delete Readings")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {T(
                          " حذف جميع قراءات العداد المحفوظة",
                          "Delete all saved meter readings"
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteReadings}
                    disabled={isDeleting.readings}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-lg transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isDeleting.readings
                        ? T("جاري الحذف...", "Deleting...")
                        : T("حذف", "Delete")}
                    </span>
                  </button>
                </div>
              </div>

              {/* Delete Notifications */}
              <div className="group bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <Bell className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {T("حذف الإشعارات", "Delete Notifications")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {T(
                          "حذف جميع الإشعارات المحفوظة",
                          "Delete all saved notifications"
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteNotifications}
                    disabled={isDeleting.notifications}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isDeleting.notifications
                        ? T("جاري الحذف...", "Deleting...")
                        : T("حذف", "Delete")}
                    </span>
                  </button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="group bg-destructive/5 border border-destructive/20 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg group-hover:bg-destructive/20 transition-colors">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-destructive">
                        {T("حذف الحساب", "Delete Account")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {T("حذف الحساب نهائياً", "Delete account permanently")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting.account}
                    className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 disabled:bg-destructive/50 text-destructive-foreground rounded-lg transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isDeleting.account
                        ? T("جاري الحذف...", "Deleting...")
                        : T("حذف الحساب", "Delete Account")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Panel */}
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {T("تحذير مهم", "Important Warning")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {T("معلومات السلامة", "Safety Information")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      {T("عمليات لا يمكن التراجع عنها", "Irreversible Actions")}
                    </p>
                    <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                      {T(
                        ` جميع عمليات الحذف المذكورة أعلاه لا يمكن التراجع عنها.
                      تأكد من عمل نسخة احتياطية من بياناتك المهمة قبل المتابعة.`,
                        `All of the above deletions cannot be undone.
Make sure to back up your important data before proceeding.`
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      {T("نصائح الأمان", "Security Tips")}
                    </p>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                      <li>
                        {T(
                          "• قم بعمل نسخة احتياطية قبل الحذف",
                          "• Make a backup before deleting."
                        )}
                      </li>
                      <li>
                        {T(
                          "• تأكد من عدم حاجتك للبيانات مستقبلاً",
                          "• Make sure you don't need the data in the future."
                        )}
                      </li>
                      <li>
                        {T(
                          "• اقرأ التحذيرات بعناية",
                          "• Read the warnings carefully."
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
