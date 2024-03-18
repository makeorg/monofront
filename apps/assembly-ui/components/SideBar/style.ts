import styled from 'styled-components';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { SidebarExternalLink } from '../../assets/ArrowSquareOut';

export const SidebarContentStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  gap: 50px;
  flex-direction: column;
  outline: none;
  padding: ${spacings.m};
`;

export const SidebarTitleCloseStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SidebarTitleStyle = styled.span`
  font-size: ${typography.FontSize.Title.GrandeCouronne};
  font-weight: 600;
`;

export const SidebarCloseStyle = styled.button`
  min-width: 35px;
  min-height: 35px;
  background-color: #f4f4f4;
  border-radius: 5px;
  outline: none;
  border-style: none;
  margin-left: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SidebarMakeStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0, 0, 0, 0.22);
  padding: ${spacings.m} 0 0;
  gap: ${spacings.s};
  width: 100%;
  color: rgba(95, 95, 95, 1);
  margin: auto auto 0;
  font-size: ${typography.FontSize.Text.RueDeLappe};
`;

export const SidebarContentContainerStyle = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const SidebarContentBlockStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SidebarContentSubtitleStyle = styled.span`
  font-size: ${typography.FontSize.Text.RueDeLappe};
  font-weight: 600;
  color: rgba(95, 95, 95, 1);
`;

export const SidebarContentListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
`;

export const SidebarContentListItemStyle = styled.li`
  list-style-type: none;
`;

export const SidebarContentLinkStyle = styled.a`
  font-size: ${typography.FontSize.Text.Arrondissement};
  text-decoration: none;
`;

export const SidebarSvgExternalStyle = styled(SidebarExternalLink)`
  display: inline-flex;
  margin-left: 5px;
  width: 15px;
  height: 15px;
`;
