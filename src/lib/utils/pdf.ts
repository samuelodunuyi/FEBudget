/* eslint-disable */

import { useState, useCallback } from 'react';
import { getExpenseTypeById2 } from '~/lib/utils/formatter';

interface DisbursementLetterData {
  clientName: string;
  clientAddress: string[];
  attention: string;
  amount: string;
  purposeOfPayment: string;
  date: string;
  items: Array<{
    expenseType: any;
    beneficiary: string;
    contractAmountInclTax: number;
  }>;
  introduction?: string;
  title: string;
}

export const useDisbursementLetterGenerator = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load Outfit font into the PDF document
   */
  const loadOutfitFont = async (doc: any) => {
    try {
      const [regularResponse, boldResponse] = await Promise.all([
        fetch('/font/Outfit/Outfit-Regular.ttf'),
        fetch('/font/Outfit/Outfit-Bold.ttf'),
      ]);

      if (regularResponse.ok && boldResponse.ok) {
        const [regularBuffer, boldBuffer] = await Promise.all([
          regularResponse.arrayBuffer(),
          boldResponse.arrayBuffer(),
        ]);

        const regularBase64 = btoa(
          new Uint8Array(regularBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const boldBase64 = btoa(
          new Uint8Array(boldBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        doc.addFileToVFS('Outfit-Regular.ttf', regularBase64);
        doc.addFileToVFS('Outfit-Bold.ttf', boldBase64);

        doc.addFont('Outfit-Regular.ttf', 'Outfit', 'normal');
        doc.addFont('Outfit-Bold.ttf', 'Outfit', 'bold');

        return true;
      }
    } catch (error) {
      console.warn('Failed to load Outfit fonts, using default fonts:', error);
    }
    return false;
  };

  /**
   * Load and convert image to base64
   */
  const loadImageAsBase64 = async (
    imagePath: string
  ): Promise<string | null> => {
    try {
      const response = await fetch(imagePath);
      if (!response.ok) {
        console.warn(`Failed to load image: ${imagePath}`);
        return null;
      }

      const blob = await response.blob();
      return await new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('Error loading image:', error);
      return null;
    }
  };

  /**
   * Format number with commas
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG').format(amount);
  };

  /**
   * Format date as "March 18th, 2025"
   */
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();

    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }

    return `${month} ${day}${suffix}, ${year}`;
  };

  /**
   * Check if we need a new page and add one
   */
  const checkAndAddPage = (
    doc: any,
    currentY: number,
    neededSpace: number = 30
  ) => {
    if (currentY + neededSpace > 280) {
      doc.addPage();
      return 20;
    }
    return currentY;
  };

  /**
   * Generate disbursement letter PDF
   */
  const generateDisbursementLetter = async (data: DisbursementLetterData) => {
    try {
      const { default: JsPDF } = await import('jspdf');
      const doc = new JsPDF();

      const fontsLoaded = await loadOutfitFont(doc);
      const fontFamily = fontsLoaded ? 'Outfit' : 'helvetica';

      // Load and add logo
      const logoBase64 = await loadImageAsBase64('/images/logo.png');
      if (logoBase64) {
        try {
          doc.addImage(logoBase64, 'PNG', 150, 15, 50, 20);
        } catch (error) {
          console.warn('Failed to add logo to PDF:', error);
          doc.setFontSize(16);
          doc.setFont(fontFamily, 'bold');
          doc.text('InfraCredit', 200, 25, { align: 'right' });
          doc.setFontSize(10);
          doc.setFont(fontFamily, 'normal');
          doc.text('Securing Infrastructure Finance', 200, 32, {
            align: 'right',
          });
        }
      } else {
        doc.setFontSize(16);
        doc.setFont(fontFamily, 'bold');
        doc.text('InfraCredit', 200, 25, { align: 'right' });
        doc.setFontSize(10);
        doc.setFont(fontFamily, 'normal');
        doc.text('Securing Infrastructure Finance', 200, 32, {
          align: 'right',
        });
      }

      let yPos = 50;

      // Date
      doc.setFont(fontFamily, 'normal');
      doc.setFontSize(11);
      // doc.text(formatDate(new Date()), 14, yPos);
      doc.text(data?.date, 14, yPos);
      yPos += 15;

      // Recipient details
      doc.setFont(fontFamily, 'bold');
      doc.text(data.clientName, 14, yPos);
      yPos += 6;

      doc.setFont(fontFamily, 'normal');
      doc.text(data.clientAddress, 14, yPos);
      yPos += 8;

      // Attention line
      doc.setFont(fontFamily, 'bold');
      doc.text(`Attention: ${data.attention}`, 14, yPos);
      yPos += 15;

      // Greeting
      doc.setFont(fontFamily, 'normal');
      doc.text('Dear Sir,', 14, yPos);
      yPos += 15;

      // Title (centered and bold)
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(12);
      const title = data?.title || 'N/A';
      const titleLines = doc.splitTextToSize(title, 180);
      titleLines.forEach((line: string) => {
        doc.text(line.toUpperCase(), 105, yPos, { align: 'center' });
        yPos += 6;
      });

      // Add underline
      doc.setLineWidth(0.5);
      doc.line(14, yPos + 2, 196, yPos + 2);
      yPos += 15;

      // Main content
      doc.setFont(fontFamily, 'normal');
      doc.setFontSize(11);
      const introText =
        data.introduction ||
        `We write to request approval for the disbursement of ${data.amount} with respect to the technical assistance facility to finance the due diligence services cost as part of the proposed debt issuance to support the design, engineering, supply, and installation services of a 2MWp Solar PV Plant and a 4MWh Battery Energy Storage System.`;

      const introLines = doc.splitTextToSize(introText, 180);
      yPos = checkAndAddPage(doc, yPos, introLines.length * 5);
      doc.text(introLines, 14, yPos);
      yPos += introLines.length * 5 + 8;

      doc.text('The breakdown of the funds is provided below:', 14, yPos);
      yPos += 15;

      // Table
      yPos = checkAndAddPage(doc, yPos, 60);

      // Table headers - Adjusted column widths for better fit
      const tableY = yPos;
      const colWidths = [20, 60, 50, 45];
      const colPositions = [14, 34, 94, 144];

      // Header background
      doc.setFillColor(16, 70, 97); // #104661
      doc.rect(14, tableY, 175, 20, 'F');

      // Header text - Split long headers into multiple lines
      doc.setTextColor(255, 255, 255);
      doc.setFont(fontFamily, 'bold');
      doc.setFontSize(9);

      // S/N header
      doc.text('S/N', colPositions[0] + 2, tableY + 12);

      // TA Request header (split into multiple lines)
      doc.text('TA Request Major', colPositions[1] + 2, tableY + 8);
      doc.text('Components Due', colPositions[1] + 2, tableY + 12);
      doc.text(
        'Diligence Cost (VAT Inclusive)',
        colPositions[1] + 2,
        tableY + 16
      );

      // Professional Party header
      doc.text('Professional', colPositions[2] + 2, tableY + 10);
      doc.text('Party', colPositions[2] + 2, tableY + 14);

      // Amount header (split into multiple lines)
      doc.text('Amount (NGN)', colPositions[3] + 2, tableY + 10);
      doc.text('Inc VAT Inclusive', colPositions[3] + 2, tableY + 14);

      yPos = tableY + 20;

      // Table rows
      doc.setTextColor(0, 0, 0);
      doc.setFont(fontFamily, 'normal');

      let totalAmount = 0;
      const rowPositions: number[] = [tableY, tableY + 20]; // Track row positions for borders

      data.items.forEach((item, index) => {
        // Wrap long text in cells with adjusted widths
        const descLines = doc.splitTextToSize(
          String(getExpenseTypeById2(item.expenseType)),
          colWidths[1] - 4
        );
        const partyLines = doc.splitTextToSize(
          item.beneficiary || '',
          colWidths[2] - 4
        );

        // Calculate row height based on content (minimum 12px, add 4px per extra line)
        const minRowHeight = 12;
        const lineHeight = 4;
        const maxLines = Math.max(descLines.length, partyLines.length);
        const rowHeight = Math.max(
          minRowHeight,
          minRowHeight + (maxLines - 1) * lineHeight
        );

        // Alternating row colors
        if (index % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(14, yPos, 175, rowHeight, 'F');
        }

        // Center vertically in the row
        const textStartY = yPos + rowHeight / 2 + 2;

        doc.text((index + 1).toString(), colPositions[0] + 2, textStartY);

        // For multi-line text, start from appropriate position
        if (descLines.length > 1) {
          const startY = yPos + 6;
          descLines.forEach((line: string, lineIndex: number) => {
            doc.text(
              line,
              colPositions[1] + 2,
              startY + lineIndex * lineHeight
            );
          });
        } else {
          doc.text(descLines, colPositions[1] + 2, textStartY);
        }

        if (partyLines.length > 1) {
          const startY = yPos + 6;
          partyLines.forEach((line: string, lineIndex: number) => {
            doc.text(
              line,
              colPositions[2] + 2,
              startY + lineIndex * lineHeight
            );
          });
        } else {
          doc.text(partyLines, colPositions[2] + 2, textStartY);
        }

        doc.text(
          formatCurrency(item.contractAmountInclTax),
          colPositions[3] + 2,
          textStartY
        );

        totalAmount += item.contractAmountInclTax;
        yPos += rowHeight;
        rowPositions.push(yPos); // Store the bottom of this row
      });

      // Total row
      doc.setFillColor(16, 70, 97); // #104661
      doc.rect(14, yPos, 175, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont(fontFamily, 'bold');
      doc.text('Total', colPositions[2] + 2, yPos + 8);
      doc.text(formatCurrency(totalAmount), colPositions[3] + 2, yPos + 8);

      yPos += 20;

      // Draw table borders after content is complete
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(0.2); // Thinner lines

      // Add total row bottom to row positions
      rowPositions.push(yPos - 8);

      // Draw horizontal lines using stored positions
      rowPositions.forEach((y) => {
        doc.line(14, y, 189, y);
      });

      // Draw vertical lines
      colPositions.forEach((pos) => {
        doc.line(pos, tableY, pos, yPos - 8);
      });
      // Right border of table
      doc.line(189, tableY, 189, yPos - 8);

      yPos = checkAndAddPage(doc, yPos, 40);

      // Closing
      doc.text('We look forward to your kind approval.', 14, yPos);
      yPos += 10;
      doc.text('Thank you.', 14, yPos);

      return doc;
    } catch (error) {
      console.error('Error generating disbursement letter PDF:', error);
      throw error;
    }
  };

  /**
   * Generate a disbursement letter PDF
   */
  const generatePdf = useCallback(
    async (
      data: DisbursementLetterData
    ): Promise<{ dataUri: string | null; blob: Blob | null }> => {
      setIsGenerating(true);
      setError(null);

      try {
        const doc = await generateDisbursementLetter(data);

        const pdfBlobData = doc.output('blob');
        setPdfBlob(pdfBlobData);

        const pdfDataUri = doc.output('datauristring');
        setPdfUrl(pdfDataUri);

        setIsGenerating(false);
        return { dataUri: pdfDataUri, blob: pdfBlobData };
      } catch (error) {
        console.error('Error generating PDF:', error);
        setError('Failed to generate PDF');
        setIsGenerating(false);
        return { dataUri: null, blob: null };
      }
    },
    []
  );

  /**
   * Get the PDF as a File object
   */
  const getPdfAsFile = (
    filename: string = 'disbursement_letter.pdf'
  ): File | null => {
    if (!pdfBlob) return null;
    return new File([pdfBlob], filename, { type: 'application/pdf' });
  };

  /**
   * Download PDF
   */
  const downloadPdf = (filename: string = 'disbursement_letter.pdf') => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    generatePdf,
    downloadPdf,
    getPdfAsFile,
    pdfUrl,
    pdfBlob,
    isGenerating,
    error,
  };
};
