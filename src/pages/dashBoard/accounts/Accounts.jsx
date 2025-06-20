import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLang, useT } from "@/hooks/LangContext";

export default function AccountingTable() {
  const T = useT();
  const columns = ["Date", "Description", "Amount", "Balance"];
  const [data, setData] = useState([]);
  const { lang } = useLang(); // Assuming you have a hook to get the current language
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // هنا تحط رابط الـ endpoint اللي عندك في الباك اند
    axios
      .get("https://your-backend-api.com/api/transactions")
      .then((response) => {
        setData(response.data); // نتوقع إن الـ backend راجع معاه array of objects
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="p-4 h-screen flex justify-center items-center"
      >
        {T("جاري التحميل...", "loading...")}
      </div>
    );
  }

  return <DynamicTable columns={columns} data={data} />;
}

function DynamicTable({ columns, data }) {
  return (
    <div className="p-4  space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className="text-center">
                {col}
              </TableHead>
            ))}
            <TableHead className="text-center">اليوم</TableHead>{" "}
            {/* عمود اليوم */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex} className="text-center">
                  {row[col] ?? "-"} {/* لو مش موجودة القيمة يحط شرطة "-" */}
                </TableCell>
              ))}
              <TableCell className="text-center">{rowIndex + 1}</TableCell>{" "}
              {/* عداد الأيام */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
