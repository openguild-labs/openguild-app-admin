import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Typography } from "antd";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import colors from "@/config/colors";
import EllipsisTypo from "@/components/EllipsisTypo";

interface ITaskItemProps {
  title: string;
  description: string;
  onClickMenu?: () => void;
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(() => ({
  border: `1px solid ${colors["primary-color"]}`,
  zIndex: 0,
  borderRadius: "8px",
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor: "rgba(40, 18, 62, .06)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function TaskItem({ title, description, onClickMenu }: ITaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const haveDescription = description !== "";
  return (
    <Accordion
      expanded={expanded}
      onChange={() => {
        if (haveDescription) {
          setExpanded(!expanded);
        }
      }}
    >
      <AccordionSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
        expandIcon={haveDescription && <MdKeyboardArrowRight className="text-base" />}
      >
        <div className="flex items-center justify-between w-full">
          <EllipsisTypo text={title} />

          <div
            onClick={(e) => {
              e.stopPropagation();
              if (onClickMenu !== undefined) onClickMenu();
            }}
            className="transition-effect flex-center p-1 hover:bg-primary-color/20 rounded"
          >
            <CiMenuKebab />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default TaskItem;
