// src/components/DoctorPendingApprovalPage.jsx
import React from 'react';
import { Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DoctorPending() {
    return (
        <div className="d-flex justify-content-center align-items-center text-center bg-light" style={{ minHeight: '80vh', padding: '40px' }}>
            <Card className="p-4 shadow rounded-4" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Body>
                    <h2 className="mb-4" style={{ color: 'var(--first-color)' }}>
                        Thank You for Joining Us!
                    </h2>
                    <Alert variant="info" className="mb-4 text-start">
                        <h5 className="alert-heading">Your Account is Awaiting Approval</h5>
                        <p>
                            We’ve received your registration request and it’s currently under review by our admin team.
                        </p>
                        <p className="mb-0">
                            You’ll be able to access your account once it’s approved. Please check back periodically to log in.
                        </p>
                    </Alert>
                    <p className="mb-4 text-muted">
                        If you have any questions, feel free to <a href="mailto:diagnocaree@gmail.com">contact us</a>. We’re here to help!
                    </p>
                    <Button
                        style={{ background: 'var(--first-color)', border: 'none' }}
                        as={Link}
                        to="/login"
                    >
                        Back to Login
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
