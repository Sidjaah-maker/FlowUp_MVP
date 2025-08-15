/**
 * Tests unitaires pour les types de jeûne
 * Validation des énumérations et interfaces critiques
 */

import {
  FastingProtocol,
  FastingPhase,
  FastingStatus,
  FastingSession,
  FastingTimerState,
  FastingError,
} from '../../types/fasting';

describe('FastingProtocol', () => {
  it('should have correct protocol values', () => {
    expect(FastingProtocol.SIXTEEN_EIGHT).toBe('16:8');
    expect(FastingProtocol.EIGHTEEN_SIX).toBe('18:6');
    expect(FastingProtocol.TWENTY_FOUR).toBe('20:4');
    expect(FastingProtocol.OMAD).toBe('OMAD');
  });

  it('should contain exactly 4 protocols', () => {
    const protocolValues = Object.values(FastingProtocol);
    expect(protocolValues).toHaveLength(4);
  });
});

describe('FastingPhase', () => {
  it('should have correct phase values', () => {
    expect(FastingPhase.DIGESTION).toBe('digestion');
    expect(FastingPhase.GLYCOGEN_DEPLETION).toBe('glycogen_depletion');
    expect(FastingPhase.FAT_BURNING).toBe('fat_burning');
    expect(FastingPhase.KETOSIS).toBe('ketosis');
    expect(FastingPhase.AUTOPHAGY).toBe('autophagy');
  });

  it('should contain exactly 5 phases', () => {
    const phaseValues = Object.values(FastingPhase);
    expect(phaseValues).toHaveLength(5);
  });
});

describe('FastingStatus', () => {
  it('should have correct status values', () => {
    expect(FastingStatus.NOT_STARTED).toBe('not_started');
    expect(FastingStatus.ACTIVE).toBe('active');
    expect(FastingStatus.PAUSED).toBe('paused');
    expect(FastingStatus.COMPLETED).toBe('completed');
    expect(FastingStatus.CANCELLED).toBe('cancelled');
  });
});

describe('FastingSession interface', () => {
  const mockSession: FastingSession = {
    id: 'test-session-1',
    startTime: new Date('2024-01-15T08:00:00Z'),
    targetDuration: 960, // 16 heures en minutes
    protocol: FastingProtocol.SIXTEEN_EIGHT,
    currentPhase: FastingPhase.DIGESTION,
    status: FastingStatus.ACTIVE,
    pausedDuration: 0,
    createdAt: new Date('2024-01-15T08:00:00Z'),
    updatedAt: new Date('2024-01-15T08:00:00Z'),
  };

  it('should create valid fasting session', () => {
    expect(mockSession.id).toBe('test-session-1');
    expect(mockSession.protocol).toBe(FastingProtocol.SIXTEEN_EIGHT);
    expect(mockSession.targetDuration).toBe(960);
    expect(mockSession.status).toBe(FastingStatus.ACTIVE);
  });

  it('should handle optional properties', () => {
    expect(mockSession.endTime).toBeUndefined();
    expect(mockSession.actualDuration).toBeUndefined();
    expect(mockSession.pausedAt).toBeUndefined();
    expect(mockSession.notes).toBeUndefined();
  });

  it('should have required timestamp properties', () => {
    expect(mockSession.startTime).toBeInstanceOf(Date);
    expect(mockSession.createdAt).toBeInstanceOf(Date);
    expect(mockSession.updatedAt).toBeInstanceOf(Date);
  });
});

describe('FastingTimerState interface', () => {
  const mockTimerState: FastingTimerState = {
    session: null,
    isActive: false,
    isPaused: false,
    timeElapsed: 0,
    timeRemaining: 0,
    currentPhase: null,
    nextPhase: null,
    phaseProgress: 0,
    overallProgress: 0,
  };

  it('should create valid timer state', () => {
    expect(mockTimerState.session).toBeNull();
    expect(mockTimerState.isActive).toBe(false);
    expect(mockTimerState.isPaused).toBe(false);
    expect(mockTimerState.timeElapsed).toBe(0);
    expect(mockTimerState.timeRemaining).toBe(0);
  });

  it('should handle progress values correctly', () => {
    expect(mockTimerState.phaseProgress).toBeGreaterThanOrEqual(0);
    expect(mockTimerState.phaseProgress).toBeLessThanOrEqual(1);
    expect(mockTimerState.overallProgress).toBeGreaterThanOrEqual(0);
    expect(mockTimerState.overallProgress).toBeLessThanOrEqual(1);
  });
});

describe('FastingError interface', () => {
  const mockError: FastingError = {
    code: 'TIMER_NOT_ACTIVE',
    message: 'Cannot pause timer when not active',
    details: { sessionId: 'test-123' },
  };

  it('should create valid fasting error', () => {
    expect(mockError.code).toBe('TIMER_NOT_ACTIVE');
    expect(mockError.message).toBe('Cannot pause timer when not active');
    expect(mockError.details).toEqual({ sessionId: 'test-123' });
  });

  it('should handle all error codes', () => {
    const errorCodes = [
      'TIMER_NOT_ACTIVE',
      'SESSION_NOT_FOUND',
      'INVALID_PROTOCOL',
      'STORAGE_ERROR',
    ];
    
    errorCodes.forEach(code => {
      const error: FastingError = {
        code: code as any,
        message: `Test error for ${code}`,
      };
      expect(error.code).toBe(code);
    });
  });
});

describe('Type validation helpers', () => {
  it('should validate protocol values', () => {
    const validProtocols = ['16:8', '18:6', '20:4', 'OMAD'];
    const protocolValues = Object.values(FastingProtocol);
    
    validProtocols.forEach(protocol => {
      expect(protocolValues).toContain(protocol);
    });
  });

  it('should validate phase values', () => {
    const validPhases = [
      'digestion',
      'glycogen_depletion', 
      'fat_burning',
      'ketosis',
      'autophagy',
    ];
    const phaseValues = Object.values(FastingPhase);
    
    validPhases.forEach(phase => {
      expect(phaseValues).toContain(phase);
    });
  });
});