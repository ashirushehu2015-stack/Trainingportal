import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation could go here
    if (!data.fullName || !data.nin || !data.email) {
      return NextResponse.json({ success: false, error: 'Missing mandatory fields' }, { status: 400 });
    }

    // Create the applicant
    const applicant = await prisma.applicant.create({
      data: {
        fullName: data.fullName,
        nin: data.nin,
        age: parseInt(data.age),
        email: data.email,
        phone: data.phone,
        stateOfOrigin: data.stateOfOrigin,
        lga: data.lga,
        indigeneCertificateUrl: data.indigeneCertificateUrl || '',
        passportPhotographUrl: data.passportPhotographUrl || '',
        track: data.track,
        
        // Track 1
        isActiveBusinessOwner: data.isActiveBusinessOwner,
        hasBasicLiteracy: data.hasBasicLiteracy,
        hasSmartphone: data.hasSmartphone,
        hasWhatsApp: data.hasWhatsApp,
        hasInternet: data.hasInternet,

        // Track 2
        tertiaryQualification: data.tertiaryQualification,
        canCommunicateClearly: data.canCommunicateClearly,
        hasLaptop: data.hasLaptop,
        hasComputerLiteracy: data.hasComputerLiteracy,

        // Track 3
        isConfirmedCivilServant: data.isConfirmedCivilServant,
        approvalLetterUrl: data.approvalLetterUrl || '',
        hasOfficeComputerAccess: data.hasOfficeComputerAccess,
        hasMsOfficeKnowledge: data.hasMsOfficeKnowledge,
      }
    });

    return NextResponse.json({ success: true, applicant }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating applicant:', error);
    
    // Handle unique constraint errors (e.g. duplicate email/nin)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'An application with this NIN or Email already exists.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit application. ' + error.message },
      { status: 500 }
    );
  }
}
